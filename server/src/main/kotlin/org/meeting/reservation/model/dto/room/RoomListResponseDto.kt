package org.meeting.reservation.model.dto.room

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty


data class RoomListResponseDto(
    @ApiModelProperty(value = "회의실 리스트")
    @JsonProperty("ROOM_LIST")
    val roomList: List<RoomInformation>
)

data class RoomInformation(
    @ApiModelProperty(value = "회의실 이름")
    @JsonProperty("ROOM_NM")
    val roomName: String,
    @ApiModelProperty(value = "회의실 코드")
    @JsonProperty("ROOM_CD")
    val roomCd: Int
)

