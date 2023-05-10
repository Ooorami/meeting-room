package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationListRequestDto(
    @ApiModelProperty("회의실 코드")
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @JsonProperty("예약일자(yyyymmdd)")
    val reservationDt: String
)
