package org.meeting.reservation.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import lombok.RequiredArgsConstructor
import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.dto.reservation.ReservationCancelRequestDto
import org.meeting.reservation.model.dto.reservation.ReservationSaveRequestDto
import org.meeting.reservation.model.enum.ApiStatusCode
import org.meeting.reservation.service.ReservationService
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["02. Reservation"], description = "예약 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation", produces = ["application/json;charset=utf-8"])
class ResercationController(
    private val reservationService: ReservationService
) {

    @ApiOperation(
        value = "예약 정보 등록 API",
        notes = "예약 API, 이미 등록된 예약정보가 있을경우 예약 실패 응답을 제공함.(-1)",
        response = ApiCommonResponse::class
    )
    @RequestMapping(value = ["/create"], method = [RequestMethod.POST])
    fun newReservation(@RequestBody request: ReservationSaveRequestDto): ApiCommonResponse {
        val saveResult = reservationService.newReservation(request)

        return if(saveResult.isReservationSuccess) {
            ApiCommonResponse(
                statusCode = ApiStatusCode.SUCCESS.code,
                message = saveResult.reservationMessage
            )
        } else {
            ApiCommonResponse(
                statusCode = ApiStatusCode.FAIL.code,
                message = saveResult.reservationMessage
            )
        }
    }

    @ApiOperation(
        value = "예약 취소 API",
        notes = "예약 취소 API, 취소할 예약 정보가 없을 경우 실패를 응답함.(-1)",
        response = ApiCommonResponse::class
    )
    @RequestMapping(value = ["/cancel"], method = [RequestMethod.POST])
    fun cancelReservation(@RequestBody request: ReservationCancelRequestDto): ApiCommonResponse{
        val cancelResult = reservationService.cancelReservation(request)
        return if(cancelResult.isReservationCancelSuccess) {
            ApiCommonResponse(
                statusCode = ApiStatusCode.SUCCESS.code,
                message = cancelResult.reservationCanelMessage
            )
        } else {
            ApiCommonResponse(
                statusCode = ApiStatusCode.FAIL.code,
                message = cancelResult.reservationCanelMessage
            )
        }

    }
}
