package org.meeting.reservation.model.dto.room

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class CreateRoomRequestDto (
    @ApiModelProperty(value = "생성을 요청할 회의실 이름", name = "ROOM_NM")
    @JsonProperty("ROOM_NM")
    val roomNm: String
)
