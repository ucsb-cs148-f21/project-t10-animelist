package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.CreateUserListInput;
import com.github.animelist.animelist.model.input.UserListItemInput;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.model.userlist.UserListItem;
import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.WatchStatus;
import com.github.animelist.animelist.service.UserListService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.github.animelist.animelist.util.TestUtil.TEST_USERNAME;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserListControllerTest {

    @Mock
    private UserListService userListService;

    @InjectMocks
    private UserListController userListController;

    private final ObjectId EXPECTED_OWNER_ID = new ObjectId();

    @Test
    void createUserList_happy() {
        mockAuthenticationPrincipal();
        final CreateUserListInput input = new CreateUserListInput("Test");
        final UserList expectedUserList = UserList.builder()
                .name("Test")
                .ownerId(EXPECTED_OWNER_ID)
                .build();

        when(userListService.createUserList(expectedUserList)).thenReturn(expectedUserList);

        final UserList actualUserList = userListController.createUserList(input);

        assertThat(actualUserList, is(expectedUserList));
    }

    @Test
    void addUserListItem_happy() {
        mockAuthenticationPrincipal();
        final var listId = new ObjectId().toString();
        final var input = new UserListItemInput(listId, 1234, WatchStatus.PLAN_TO_WATCH.toString(), null);
        final var expected = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        when(userListService.addItem(listId, EXPECTED_OWNER_ID.toString(), expected)).thenReturn(true);

        final var actual = userListController.addUserListItem(input);

        assertThat(actual, is(expected));
    }

    @Test
    void addUserListItem_failAdd() {
        mockAuthenticationPrincipal();
        final var listId = new ObjectId().toString();
        final var input = new UserListItemInput(listId, 1234, WatchStatus.PLAN_TO_WATCH.toString(), null);
        final var expected = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        when(userListService.addItem(listId, EXPECTED_OWNER_ID.toString(), expected)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userListController.addUserListItem(input));
    }

    @Test
    void updateUserListItem_happy() {
        mockAuthenticationPrincipal();
        final var listId = new ObjectId().toString();
        final var input = new UserListItemInput(listId, 1234, WatchStatus.PLAN_TO_WATCH.toString(), null);
        final var expected = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        when(userListService.updateItem(listId, EXPECTED_OWNER_ID.toString(), expected)).thenReturn(true);

        final var actual = userListController.updateUserListItem(input);

        assertThat(actual, is(expected));
    }

    @Test
    void updateUserListItem_failUpdate() {
        mockAuthenticationPrincipal();
        final var listId = new ObjectId().toString();
        final var input = new UserListItemInput(listId, 1234, WatchStatus.PLAN_TO_WATCH.toString(), null);
        final var expected = UserListItem.builder()
                .mediaID(1234)
                .watchStatus(WatchStatus.PLAN_TO_WATCH)
                .build();

        when(userListService.updateItem(listId, EXPECTED_OWNER_ID.toString(), expected)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userListController.updateUserListItem(input));
    }

    private void mockAuthenticationPrincipal() {
        final JwtUserDetails mockJwtUserDetails = JwtUserDetails.builder()
                .username(TEST_USERNAME)
                .id(EXPECTED_OWNER_ID.toString())
                .build();
        final Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(mockJwtUserDetails);
        final SecurityContext secCtx = mock(SecurityContext.class);
        when(secCtx.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(secCtx);
    }
}
