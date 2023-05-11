package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationListRequestDto(
    @ApiModelProperty(value = "회의실 코드")
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @ApiModelProperty(value = "예약일자(yyyymmdd)")
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String
)
