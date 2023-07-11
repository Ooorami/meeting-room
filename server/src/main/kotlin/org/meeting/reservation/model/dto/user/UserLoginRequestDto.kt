package org.meeting.reservation.model.dto.user

import com.fasterxml.jackson.annotation.JsonProperty

data class UserLoginRequestDto (
    @JsonProperty("USER_ID")
    val userId: String,
    @JsonProperty("USER_PW")
    val userPw: String
)
