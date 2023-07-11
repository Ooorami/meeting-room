package org.meeting.reservation.mapper

import org.meeting.reservation.domain.RoomMasterRepository
import org.meeting.reservation.model.dto.room.CreateRoomRequestDto
import org.meeting.reservation.model.entity.RoomMaster
import org.springframework.stereotype.Service

@Service
class RoomMasterMapper(
    private val roomMasterRepository: RoomMasterRepository
) {
    fun createRoomRequestDtoToEntity(request: CreateRoomRequestDto): RoomMaster {
        val lastRoomCd = roomMasterRepository.findFirstByOrderByRoomCdDesc()?.roomCd ?: 0
        return RoomMaster(
            roomCd = lastRoomCd + 1,
            roomNm = request.roomNm
        )
    }
}
