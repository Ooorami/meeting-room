package org.meeting.reservation.model.dto.user

import com.fasterxml.jackson.annotation.JsonProperty

data class UserCreateRequestDto(
    @JsonProperty("NAME")
    val name: String,
    @JsonProperty("USER_ID")
    val userId: String,
    @JsonProperty("USER_PW")
    val userPw: String
)
