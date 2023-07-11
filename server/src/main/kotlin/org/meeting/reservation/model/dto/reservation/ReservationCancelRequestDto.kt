package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationCancelRequestDto(
    @ApiModelProperty(value = "예약 ID", example = "1")
    @JsonProperty("RESERVATION_ID")
    val id: Int,
)
