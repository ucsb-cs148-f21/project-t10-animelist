package com.github.animelist.animelist.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class HealthCheckControllerTest {

    private HealthCheckController healthCheckController;

    @BeforeEach
    void setUp() {
        healthCheckController = new HealthCheckController();
    }

    @Test
    void healthCheck_happy() {
        final String expected = "healthy";
        final String actualStatus = healthCheckController.healthCheck();

        assertThat(actualStatus, is(expected));
    }
}
