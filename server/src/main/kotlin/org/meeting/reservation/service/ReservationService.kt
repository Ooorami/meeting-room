package org.meeting.reservation.service

import org.meeting.reservation.domain.ReservationLogRepository
import org.meeting.reservation.mapper.ReservationLogMapper
import org.meeting.reservation.model.dto.reservation.*
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
        val reservation = reservationLogMapper.reservationSaveRequestDtoToReservationLog(request)
        reservationLogRepository.save(reservation)

        return ReservationSaveCheckerVto(
            isReservationSuccess = true,
            reservationMessage = "SUCCESS"
        )
    }

    fun updateReservation(request: ReservationUpdateRequestDto) {
        val reservation = reservationLogRepository.findById(request.id).orElse(null)
            ?: throw RuntimeException("예약정보 업데이트 대상을 찾지못했습니다. 요청ID: ${request.id}")

        reservation.update(request)
    }

    fun cancelReservation(cancelRequest: ReservationCancelRequestDto): ReservationCancelCheckerVto {
        val preRoomReservation = reservationLogRepository.findById(cancelRequest.id).orElse(null)
            ?: return ReservationCancelCheckerVto(
                isReservationCancelSuccess = false,
                reservationCanelMessage = "예약취소 요청에 대한 예약건이 없습니다. 취소할 예약이 없습니다."
            )

        if (preRoomReservation.useYn == UseYn.NO.code)
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

    fun getReservationList(): ReservationListResponseDto {
        val reservationList = reservationLogRepository.findAll()

        return ReservationListResponseDto(
            reservationList = reservationList.map { reservation ->
                ReservationInformation(
                    reservationId = reservation.id!!,
                    roomCd = reservation.roomCd,
                    reservationDt = reservation.reservationDt,
                    checker = reservation.reservationChecker,
                    startTm = reservation.startTm,
                    endTm = reservation.endTm,
                    reservationTm = reservation.reservationTm,
                    useYn = reservation.useYn
                )
            }
        )
    }
}
