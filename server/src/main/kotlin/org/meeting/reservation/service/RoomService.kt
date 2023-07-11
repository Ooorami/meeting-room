package org.meeting.reservation.service

import org.meeting.reservation.domain.RoomMasterRepository
import org.meeting.reservation.mapper.RoomMasterMapper
import org.meeting.reservation.model.dto.room.CreateRoomRequestDto
import org.meeting.reservation.model.dto.room.RoomInformation
import org.meeting.reservation.model.dto.room.RoomListResponseDto
import org.meeting.reservation.model.vto.room.RoomSaveCheckerVto
import org.springframework.stereotype.Service

@Service
class RoomService(
    private val roomMasterRepository: RoomMasterRepository,
    private val roomMasterMapper: RoomMasterMapper
) {
    fun saveRoom(request: CreateRoomRequestDto): RoomSaveCheckerVto {
        val preExistCheck = roomMasterRepository.findByRoomNm(request.roomNm)

        if (preExistCheck != null)
            return RoomSaveCheckerVto(
                isRoomSaveSuccess = false,
                roomSaveMessage = "요청 이름에 대한 회의실이 이미 존재합니다. (요청 이름: ${preExistCheck.roomNm})"
            )

        roomMasterRepository.save(roomMasterMapper.createRoomRequestDtoToEntity(request))

        return RoomSaveCheckerVto(
            isRoomSaveSuccess = true,
            roomSaveMessage = "SUCCESS"
        )
    }

    fun getMeetingRoomList(): RoomListResponseDto {
        val meetingRoom = roomMasterRepository.findAll()
        return RoomListResponseDto(
            roomList = meetingRoom.map { room ->
                RoomInformation(
                    roomName = room.roomNm,
                    roomCd = room.roomCd
                )
            }
        )
    }
}

