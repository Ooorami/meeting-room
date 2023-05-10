package org.meeting.reservation.model.vto.reservation


data class ReservationSaveCheckerVto(
    val isReservationSuccess: Boolean,
    val reservationMessage: String
)
