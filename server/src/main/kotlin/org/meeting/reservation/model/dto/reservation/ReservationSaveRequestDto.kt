package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationSaveRequestDto (
    @ApiModelProperty(value = "회의실 이름")
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @ApiModelProperty(value = "예약 시작시간")
    @JsonProperty("START_TM")
    val startTm: String,
    @ApiModelProperty(value = "예약 종료시간")
    @JsonProperty("END_TM")
    val endTm: String,
    @ApiModelProperty(value = "예약 일자(yyyymmdd)")
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String,
    @ApiModelProperty(value = "예약자")
    @JsonProperty("CHECKER")
    val checker: String,
    @ApiModelProperty(value = "회의 주제")
    @JsonProperty("TOPIC")
    val topic: String?,
    @ApiModelProperty(value = "참여자")
    @JsonProperty("PARTICIPANT")
    val participant: String?
)
