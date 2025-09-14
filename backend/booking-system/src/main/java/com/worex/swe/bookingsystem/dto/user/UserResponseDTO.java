package com.worex.swe.bookingsystem.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}
