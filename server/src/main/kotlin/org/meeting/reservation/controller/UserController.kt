package org.meeting.reservation.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import lombok.RequiredArgsConstructor
import org.meeting.reservation.model.dto.ApiCommonResponse
import org.meeting.reservation.model.dto.user.UserCreateRequestDto
import org.meeting.reservation.model.dto.user.UserLoginRequestDto
import org.meeting.reservation.model.enum.ApiStatusCode
import org.meeting.reservation.service.UserCoreService
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["03. User"], description = "유저 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
class UserController(
    private val userCoreService: UserCoreService
) {

    @ApiOperation(
        value = "유저 생성 API",
        response = ApiCommonResponse::class
    )
    @RequestMapping(method = [RequestMethod.POST])
    fun createUser(@RequestBody request: UserCreateRequestDto): ApiCommonResponse {
        val result = userCoreService.creatUser(request)

        return if(result.isUserCreateSuccess) {
            ApiCommonResponse(
                statusCode = ApiStatusCode.SUCCESS.code,
                message = result.message
            )
        } else {
            ApiCommonResponse(
                statusCode = ApiStatusCode.FAIL.code,
                message = result.message
            )
        }
    }

    @ApiOperation(
        value = "유저 로그인 API",
        response = ApiCommonResponse::class
    )
    @RequestMapping(value = ["/login"], method = [RequestMethod.POST])
    fun userLogin(@RequestBody request: UserLoginRequestDto): ApiCommonResponse {
        val result = userCoreService.login(request.userId, request.userPw)

        return if(result.isUserLoginSuccess) {
            ApiCommonResponse(
                statusCode = ApiStatusCode.SUCCESS.code,
                message = result.message
            )
        } else {
            ApiCommonResponse(
                statusCode = ApiStatusCode.FAIL.code,
                message = result.message
            )
        }
    }
}
