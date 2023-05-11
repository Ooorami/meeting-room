package org.meeting.reservation.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import lombok.RequiredArgsConstructor
import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.dto.room.CreateRoomRequestDto
import org.meeting.reservation.model.dto.room.RoomListResponseDto
import org.meeting.reservation.model.enum.ApiStatusCode
import org.meeting.reservation.service.RoomService
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["01. Meeting Room"], description = "회의실 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room", produces = ["application/json;charset=utf-8"])
class RoomController(
    private val roomService: RoomService
) {
    @ApiOperation(
        value = "회의실 정보 생성 API",
        notes = "회의실 이름 요청시 생성. 단, 같은 이름이 존재할경우 실패",
        response = ApiCommonResponse::class
    )
    @RequestMapping(value = ["/create"], method = [RequestMethod.POST])
    fun createNewRoom(@RequestBody request: CreateRoomRequestDto): ApiCommonResponse {
        val createResult = roomService.saveRoom(request)
        return if (createResult.isRoomSaveSuccess) {
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

    @ApiOperation(
        value = "회의실 조회 API",
        notes = "저장된 모든 회의실 정보를 반환, 미조회시 빈 리스트 반환",
        response = RoomListResponseDto::class
    )
    @RequestMapping(value = ["/list"], method = [RequestMethod.GET])
    fun getRoomList(): ApiCommonResponse {
        return ApiCommonResponse(
            statusCode = ApiStatusCode.SUCCESS.code,
            message = "SUCCESS",
            data = roomService.getMeetingRoomList()
        )
    }
}
