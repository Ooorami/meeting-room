package org.meeting.reservation.domain

import org.meeting.reservation.model.entity.RoomMaster
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoomMasterRepository: JpaRepository<RoomMaster, Int> {
    fun findByRoomNm(roomNm: String): RoomMaster?
    fun findFirstByOrderByRoomCdDesc(): RoomMaster?
}

