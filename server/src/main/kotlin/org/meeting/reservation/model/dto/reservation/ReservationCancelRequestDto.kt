package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationCancelRequestDto(
    @ApiModelProperty(value = "회의실 이름", example = "대회의실")
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @ApiModelProperty(value = "예약자", example = "홍길동")
    @JsonProperty("CHECKER")
    val checker: String,
    @ApiModelProperty(value = "예약 일자(yyyymmdd)", example = "20230511")
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String,
    @ApiModelProperty(value = "예약 시작시간(hhmmss)", example = "123000")
    @JsonProperty("START_TM")
    val startTm: String
)
