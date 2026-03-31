package com.project.LibrarySystem.entity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public enum Role {
    ADMIN(Set.of(Permissions.ADD_BOOK, Permissions.EDIT_BOOK, Permissions.READ_BOOK, Permissions.DELETE_BOOK)),
    LIBRARIAN(Set.of(Permissions.READ_BOOK,Permissions.EDIT_BOOK,Permissions.DELETE_BOOK)),
    STUDENT(Set.of(Permissions.READ_BOOK));

    private final Set<Permissions> permissions;

    Role(Set<Permissions> permissions) {
        this.permissions = permissions;
    }
    public Set<Permissions> getPermissions() {
        return permissions;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = new ArrayList<>(
                getPermissions().stream()
                        .map(p -> new SimpleGrantedAuthority(p.name()))
                        .toList());

    authorities.add(new SimpleGrantedAuthority("ROLE_" + name()));
return authorities;
    }
}
