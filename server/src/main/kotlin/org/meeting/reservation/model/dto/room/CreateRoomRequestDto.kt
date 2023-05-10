package org.meeting.reservation.model.dto.room

import com.fasterxml.jackson.annotation.JsonProperty

data class CreateRoomRequestDto (
    @JsonProperty("ROOM_NM")
    val roomNm: String
)
