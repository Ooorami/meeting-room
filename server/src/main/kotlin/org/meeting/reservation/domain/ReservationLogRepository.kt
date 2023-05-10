package org.meeting.reservation.domain

import org.meeting.reservation.model.entity.ReservationLog
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReservationLogRepository: JpaRepository<ReservationLog, ReservationLog.Key> {
    fun findByKey_RoomCdAndKey_ReservationDtAndKey_ReservationCheckerAndKey_StartTm(
        roomCd: String, reservationDt: String, reservationChecker: String, startTm: String
    ): ReservationLog?
}
