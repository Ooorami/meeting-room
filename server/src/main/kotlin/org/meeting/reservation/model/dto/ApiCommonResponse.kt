package org.meeting.reservation.model.dto

import io.swagger.annotations.ApiModelProperty

data class ApiCommonResponse(
    @ApiModelProperty(value = "응답코드")
    val statusCode: Int,
    @ApiModelProperty(value = "응답메세지")
    val message: String,
    @ApiModelProperty(value = "응답데이터", required = false)
    val data: Any? = null
)
