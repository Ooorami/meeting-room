package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class ReservationListResponseDto(
    @ApiModelProperty("회의실 예약 현황 리스트")
    @JsonProperty("RESERVATION_LIST")
    val reservationList: List<ReservationInformation>
)

data class ReservationInformation(
    @JsonProperty("RESERVATION_ID")
    val reservationId: Int,
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String,
    @JsonProperty("CHECKER")
    val checker: String,
    @JsonProperty("START_TM")
    val startTm: String,
    @JsonProperty("END_TM")
    val endTm: String,
    @JsonProperty("RESERVATION_TM")
    val reservationTm: String?,
)
