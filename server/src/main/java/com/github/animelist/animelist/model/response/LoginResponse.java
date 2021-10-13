package com.github.animelist.animelist.model.response;

import com.github.animelist.animelist.entity.User;

public record LoginResponse(boolean success, String token, User user) {
}
