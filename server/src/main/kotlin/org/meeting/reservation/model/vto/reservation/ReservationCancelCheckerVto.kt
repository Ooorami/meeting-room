package org.meeting.reservation.model.vto.reservation

data class ReservationCancelCheckerVto(
    val isReservationCancelSuccess: Boolean,
    val reservationCanelMessage: String
)
