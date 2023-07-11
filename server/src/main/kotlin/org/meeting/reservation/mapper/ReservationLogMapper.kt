package org.meeting.reservation.mapper

import org.meeting.reservation.model.dto.reservation.ReservationSaveRequestDto
import org.meeting.reservation.model.entity.ReservationLog
import org.meeting.reservation.model.enum.UseYn
import org.meeting.reservation.utility.TimeUtil
import org.springframework.stereotype.Service

@Service
class ReservationLogMapper {
    fun reservationSaveRequestDtoToReservationLog(request: ReservationSaveRequestDto): ReservationLog {
        return ReservationLog(
            roomCd = request.roomCd,
            reservationDt = request.reservationDt,
            reservationChecker = request.checker,
            startTm = request.startTm,
            endTm = request.endTm,
            reservationTm = TimeUtil.getNowTimeHHMMSS(),
            topic = request.topic,
            participant = request.participant,
            useYn = UseYn.YES.code
        )
    }
}
