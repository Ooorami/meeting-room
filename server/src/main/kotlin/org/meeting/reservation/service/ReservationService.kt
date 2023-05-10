package org.meeting.reservation.service

import org.meeting.reservation.domain.ReservationLogRepository
import org.springframework.stereotype.Service

@Service
class ReservationService(
    private val reservationLogRepository: ReservationLogRepository
) {
    fun newReservation() {

    }
}
