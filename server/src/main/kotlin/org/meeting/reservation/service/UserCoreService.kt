package org.meeting.reservation.service

import org.meeting.reservation.domain.UserRepository
import org.meeting.reservation.mapper.UserMapper
import org.meeting.reservation.model.dto.user.UserCreateRequestDto
import org.meeting.reservation.model.vto.user.UserCreateCheckerVto
import org.meeting.reservation.model.vto.user.UserLoginCheckerVto
import org.springframework.stereotype.Service

@Service
class UserCoreService(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) {
    fun creatUser(request: UserCreateRequestDto): UserCreateCheckerVto {
        val preUser = userRepository.findByUserId(request.userId)
        if (preUser != null)
            return UserCreateCheckerVto(
                isUserCreateSuccess = false,
                message = "ID가 중복됩니다: ${request.userId}"
            )

        if(request.userId.length > 50)
            return UserCreateCheckerVto(
                isUserCreateSuccess = false,
                message = "ID의 길이는 50자 이하만 가능합니다. 현재길이: ${request.userId.length}"
            )

        if(request.userPw.length < 6 || request.userPw.length > 12)
            return UserCreateCheckerVto(
                isUserCreateSuccess = false,
                message = "비밀번호는 6~12자 사이만 가능합니다. 현재길이: ${request.userPw.length}"
            )

        userRepository.save(userMapper.userCreateRequestToEntity(request))
        return UserCreateCheckerVto(
            isUserCreateSuccess = true,
            message = "Success"
        )
    }

    fun login(id: String, password: String): UserLoginCheckerVto {
        val user = userRepository.findByUserId(id)
            ?: return UserLoginCheckerVto(
                isUserLoginSuccess = false,
                message = "잘못된 ID입니다. ID를 확인바랍니다."
            )

        if (user.userPw != password) {
            return UserLoginCheckerVto(
                isUserLoginSuccess = false,
                message = "잘못된 비밀번호입니다. 비밀번호를 확인바랍니다."
            )
        }

        return UserLoginCheckerVto(
            isUserLoginSuccess = true,
            message = "Login Success"
        )
    }
}
