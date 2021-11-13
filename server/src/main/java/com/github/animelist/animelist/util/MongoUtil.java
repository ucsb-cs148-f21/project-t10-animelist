package com.github.animelist.animelist.util;

import com.mongodb.client.result.UpdateResult;

public final class MongoUtil {

    private MongoUtil() {
    }

    public static boolean verifyOneUpdated(final UpdateResult result) {
        return result.getMatchedCount() == 1;
    }
}
