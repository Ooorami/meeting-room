package org.meeting.reservation.model.vto.user

data class UserLoginCheckerVto (
    val isUserLoginSuccess: Boolean,
    val message: String
)
