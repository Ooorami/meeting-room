package org.meeting.reservation.mapper

import org.meeting.reservation.model.dto.user.UserCreateRequestDto
import org.meeting.reservation.model.entity.User
import org.springframework.stereotype.Service

@Service
class UserMapper() {

    fun userCreateRequestToEntity(request: UserCreateRequestDto): User {
        return User(
            userName = request.name,
            userId = request.userId,
            userPw = request.userPw
        )
    }
}
