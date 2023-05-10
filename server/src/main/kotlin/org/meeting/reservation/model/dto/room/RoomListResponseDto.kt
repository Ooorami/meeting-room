package org.meeting.reservation.model.dto.room

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonTypeName
import org.meeting.reservation.model.entity.RoomMaster


data class RoomListResponseDto(
    @JsonProperty("ROOM_LIST")
    val roomList: List<RoomInformation>
)

data class RoomInformation(
    @JsonProperty("ROOM_NM")
    val roomName: String,
    @JsonProperty("ROOM_CD")
    val roomCd: Int
)

