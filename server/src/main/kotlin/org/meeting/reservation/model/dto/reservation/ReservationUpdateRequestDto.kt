package org.meeting.reservation.model.dto.reservation

import com.fasterxml.jackson.annotation.JsonProperty

data class ReservationUpdateRequestDto (
    @JsonProperty("RESERVATION_ID")
    val id: Int,
    @JsonProperty("RESERVATION_DT")
    var reservationDt: String?,
    @JsonProperty("RESERVATION_CHECKER")
    var reservationChecker: String?,
    @JsonProperty("START_TM")
    var startTm: String?,
    @JsonProperty("END_TM")
    var endTm: String?,
    @JsonProperty("RESERVATION_TM")
    var reservationTm: String?,
    @JsonProperty("TOPIC")
    var topic: String?,
    @JsonProperty("PARTICIPANT")
    var participant: String?,
)
