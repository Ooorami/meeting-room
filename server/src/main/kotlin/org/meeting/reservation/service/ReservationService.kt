package org.meeting.reservation.service

import org.meeting.reservation.domain.ReservationLogRepository
import org.meeting.reservation.mapper.ReservationLogMapper
import org.meeting.reservation.model.dto.reservation.ReservationCancelRequestDto
import org.meeting.reservation.model.dto.reservation.ReservationSaveRequestDto
import org.meeting.reservation.model.enum.UseYn
import org.meeting.reservation.model.vto.reservation.ReservationCancelCheckerVto
import org.meeting.reservation.model.vto.reservation.ReservationSaveCheckerVto
import org.springframework.stereotype.Service

@Service
class ReservationService(
    private val reservationLogRepository: ReservationLogRepository,
    private val reservationLogMapper: ReservationLogMapper
) {
    fun newReservation(request: ReservationSaveRequestDto): ReservationSaveCheckerVto {
        val preRoomReservation =
            reservationLogRepository.findByKey_RoomCdAndKey_ReservationDtAndKey_ReservationCheckerAndKey_StartTmAndUseYn(
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

    fun cancelReservation(cancelRequest: ReservationCancelRequestDto): ReservationCancelCheckerVto {
        val preRoomReservation =
            reservationLogRepository.findByKey_RoomCdAndKey_ReservationDtAndKey_ReservationCheckerAndKey_StartTm(
                cancelRequest.roomCd, cancelRequest.reservationDt, cancelRequest.checker, cancelRequest.startTm
            ) ?: return ReservationCancelCheckerVto(
                    isReservationCancelSuccess = false,
                    reservationCanelMessage = "예약취소 요청에 대한 예약건이 없습니다. 취소할 예약이 없습니다."
                )

        if(preRoomReservation.useYn == UseYn.NO.code)
            return ReservationCancelCheckerVto(
                isReservationCancelSuccess = false,
                reservationCanelMessage = "이미 예약취소된 건입니다."
            )

        preRoomReservation.cancel()

        return ReservationCancelCheckerVto(
            isReservationCancelSuccess = true,
            reservationCanelMessage = "SUCCESS"
        )
    }
}
