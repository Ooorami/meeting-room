package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationCancelRequestDto(
    @ApiModelProperty(value = "회의실 이름")
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @ApiModelProperty(value = "예약자")
    @JsonProperty("CHECKER")
    val checker: String,
    @ApiModelProperty(value = "예약 일자(yyyymmdd)")
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String,
    @ApiModelProperty(value = "예약 시작시간")
    @JsonProperty("START_TM")
    val startTm: String
)
