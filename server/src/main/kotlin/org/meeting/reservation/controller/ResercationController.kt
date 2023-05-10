package org.meeting.reservation.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import lombok.RequiredArgsConstructor
import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.enum.ApiStatusCode
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["02. Reservation"], description = "예약 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping(name = "/api/reservation", produces = ["application/json;charset=utf-8"])
class ResercationController {

    @ApiOperation(
        value = "예약 정보 등록 API",
        notes = "",
        response = ApiCommonResponse::class
    )
    @RequestMapping(name = "/create")
    fun newReservation(): ApiCommonResponse {
        return ApiCommonResponse(
            statusCode = ApiStatusCode.SUCCESS.code,
            message = ""
        )
    }
}
