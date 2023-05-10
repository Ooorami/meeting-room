package org.meeting.reservation.controller

import lombok.RequiredArgsConstructor
import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.dto.room.CreateRoomRequestDto
import org.meeting.reservation.model.enum.ApiStatusCode
import org.meeting.reservation.service.RoomService
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequiredArgsConstructor
@RequestMapping(name = "/api/room", produces = ["application/json;charset=utf-8"])
class RoomController(
    private val roomService: RoomService
) {

    @RequestMapping(name = "/create", method = [RequestMethod.POST])
    fun createNewRoom(@RequestBody request: CreateRoomRequestDto): ApiCommonResponse {
        val createResult = roomService.saveRoom(request)
        return if(createResult.isRoomSaveSuccess){
            ApiCommonResponse(
                statusCode = ApiStatusCode.SUCCESS.code,
                message = createResult.roomSaveMessage
            )
        } else {
            ApiCommonResponse(
                statusCode = ApiStatusCode.FAIL.code,
                message = createResult.roomSaveMessage
            )
        }
    }
}
