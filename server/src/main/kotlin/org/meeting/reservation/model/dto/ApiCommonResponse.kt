package org.meeting.reservation.model.dto

data class ApiCommonResponse(
    val statusCode: Int,
    val message: String,
    val data: Any? = null
)
