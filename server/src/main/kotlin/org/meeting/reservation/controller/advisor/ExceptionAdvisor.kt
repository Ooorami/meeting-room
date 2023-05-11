package org.meeting.reservation.controller.advisor

import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.enum.ApiStatusCode
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler


@RestController
@ControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
class ExceptionAdvisor : ResponseEntityExceptionHandler() {
    @ExceptionHandler(Exception::class)
    fun exceptionHandler(ex: Exception): ResponseEntity<ApiCommonResponse> {
        return ResponseEntity.ok(
            ApiCommonResponse(
                statusCode = ApiStatusCode.ERROR.code,
                message = "예기치 못한 오류가 발생했습니다: ${ex.message}"
            )
        )
    }
}
