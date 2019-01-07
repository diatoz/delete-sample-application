package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Perm;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Perm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermRepository extends JpaRepository<Perm, Long> {

}
