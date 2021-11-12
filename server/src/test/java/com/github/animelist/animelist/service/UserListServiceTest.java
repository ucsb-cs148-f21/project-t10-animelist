package com.github.animelist.animelist.service;

import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.SubRating;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.model.userlist.UserListItem;
import com.github.animelist.animelist.model.userlist.WatchStatus;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.Collections;

import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@ExtendWith(MockitoExtension.class)
public class UserListServiceTest {

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private UserListService userListService;

    @Test
    public void createUserList_happy() {
        final var userListInput = UserList.builder()
                .name("test")
                .ownerId(new ObjectId())
                .ratingSystem(ContinuousRatingSystem.builder()
                        .name("test")
                        .ownerId(new ObjectId())
                        .size(10)
                        .offset(1)
                        .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                        .build())
                .items(singletonList(
                        UserListItem.builder()
                                .mediaID(1234)
                                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                                .build()
                ))
                .build();
        final var expectedUserList = UserList.builder()
                .id(new ObjectId().toString())
                .name("test")
                .ownerId(new ObjectId())
                .ratingSystem(ContinuousRatingSystem.builder()
                        .name("test")
                        .ownerId(new ObjectId())
                        .size(10)
                        .offset(1)
                        .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                        .build())
                .items(singletonList(
                        UserListItem.builder()
                                .mediaID(1234)
                                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                                .build()
                ))
                .build();

        when(mongoTemplate.insert(userListInput)).thenReturn(expectedUserList);

        var actualUserList = userListService.createUserList(userListInput);

        assertThat(actualUserList, is(expectedUserList));
    }

    @Test
    public void getUserList_happy() {
        final var expectedUserList = UserList.builder()
                .id(new ObjectId().toString())
                .name("test")
                .ownerId(new ObjectId())
                .ratingSystem(ContinuousRatingSystem.builder()
                        .name("test")
                        .ownerId(new ObjectId())
                        .size(10)
                        .offset(1)
                        .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                        .build())
                .items(singletonList(
                        UserListItem.builder()
                                .mediaID(1234)
                                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                                .build()
                ))
                .build();

        when(mongoTemplate.findById(eq(new ObjectId(expectedUserList.getId())), eq(UserList.class)))
                .thenReturn(expectedUserList);

        var actualUserList = userListService.getUserList(expectedUserList.getId()).get();

        assertThat(actualUserList, is(expectedUserList));
    }

    @Test
    public void addItem_happy() {
        final var expectedUserListId = new ObjectId();
        final var expectedOwnerId = new ObjectId();

        final var expectedUserListItem = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        var expectedQuery = new Query()
                .addCriteria(where("_id").is(expectedUserListId).and("ownerId").is(expectedOwnerId))
                .addCriteria(where("items.mediaID").ne(expectedUserListItem.getMediaID()));

        var expectedUpdate = new Update()
                .push("items").value(expectedUserListItem);

        var updateResult = mock(UpdateResult.class);
        when(updateResult.getMatchedCount()).thenReturn(1L);

        when(mongoTemplate.updateFirst(any(), any(), eq(UserList.class)))
                .thenReturn(updateResult);

        boolean expected = userListService.addItem(expectedUserListId.toString(), expectedOwnerId.toString(), expectedUserListItem);

        verify(mongoTemplate, times(1)).updateFirst(eq(expectedQuery), eq(expectedUpdate), eq(UserList.class));
        assertThat(expected, is(true));
    }

    @Test
    public void updateItem_happy() {
        final var expectedUserListId = new ObjectId();
        final var expectedOwnerId = new ObjectId();

        final var expectedUserListItem = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        var expectedQuery = new Query()
                .addCriteria(where("_id").is(expectedUserListId).and("ownerId").is(expectedOwnerId))
                .addCriteria(where("items.mediaID").is(expectedUserListItem.getMediaID()));

        var expectedUpdate = new Update()
                .set("items.$", expectedUserListItem);

        var updateResult = mock(UpdateResult.class);
        when(updateResult.getMatchedCount()).thenReturn(1L);

        when(mongoTemplate.updateFirst(any(), any(), eq(UserList.class))).thenReturn(updateResult);

        boolean expected = userListService.updateItem(expectedUserListId.toString(), expectedOwnerId.toString(), expectedUserListItem);

        verify(mongoTemplate, times(1)).updateFirst(eq(expectedQuery), eq(expectedUpdate), eq(UserList.class));
        assertThat(expected, is(true));
    }
}
