package org.meeting.reservation.domain

import org.meeting.reservation.model.entity.ReservationLog
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReservationLogRepository: JpaRepository<ReservationLog, Int> {
    fun findByRoomCdAndReservationDt(roomCd: String, reservationDt: String): List<ReservationLog>
}
