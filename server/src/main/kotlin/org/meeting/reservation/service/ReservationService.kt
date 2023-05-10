package org.meeting.reservation.service

import org.meeting.reservation.domain.ReservationLogRepository
import org.meeting.reservation.mapper.ReservationLogMapper
import org.meeting.reservation.model.dto.reservation.ReservationSaveRequestDto
import org.meeting.reservation.model.vto.reservation.ReservationSaveCheckerVto
import org.springframework.stereotype.Service

@Service
class ReservationService(
    private val reservationLogRepository: ReservationLogRepository,
    private val reservationLogMapper: ReservationLogMapper
) {
    fun newReservation(request: ReservationSaveRequestDto): ReservationSaveCheckerVto {
        val preRoomReservation =
            reservationLogRepository.findByKey_RoomCdAndKey_ReservationDtAndKey_ReservationCheckerAndKey_StartTm(
                request.roomCd, request.reservationDt, request.checker, request.startTm
            )

        if (preRoomReservation != null) {
            val preReservationAlertString = "예약일자: ${preRoomReservation.key.reservationDt}" +
                    "예약자: ${preRoomReservation.key.reservationDt}" +
                    "예약시간: ${preRoomReservation.key.startTm} ~ ${preRoomReservation.endTm}"
            return ReservationSaveCheckerVto(
                isReservationSuccess = false,
                reservationMessage = "이미 예약된 건이 존재합니다. ($preReservationAlertString)"
            )
        }

        val reservation = reservationLogMapper.reservationSaveRequestDtoToReservationLog(request)
        reservationLogRepository.save(reservation)

        return ReservationSaveCheckerVto(
            isReservationSuccess = true,
            reservationMessage = "SUCCESS"
        )
    }
}
