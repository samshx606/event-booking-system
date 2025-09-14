package com.worex.swe.bookingsystem.mapper;

import com.worex.swe.bookingsystem.dto.user.UserRequestDTO;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRequestDTO dto);
    UserResponseDTO toResponseDTO(User entity);
}
