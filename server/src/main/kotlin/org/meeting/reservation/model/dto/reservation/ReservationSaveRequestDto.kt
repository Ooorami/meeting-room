package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty

data class ReservationSaveRequestDto (
    @JsonProperty("ROOM_CD")
    val roomCd: String,
    @JsonProperty("START_TM")
    val startTm: String,
    @JsonProperty("END_TM")
    val endTm: String,
    @JsonProperty("RESERVATION_DT")
    val reservationDt: String,
    @JsonProperty("CHECKER")
    val checker: String,
    @JsonProperty("TOPIC")
    val topic: String?,
    @JsonProperty("PARTICIPANT")
    val participant: String?
)
