package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Perm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Perm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermRepository extends JpaRepository<Perm, Long> {

    @Query(value = "select distinct perm from Perm perm left join fetch perm.roles",
        countQuery = "select count(distinct perm) from Perm perm")
    Page<Perm> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct perm from Perm perm left join fetch perm.roles")
    List<Perm> findAllWithEagerRelationships();

    @Query("select perm from Perm perm left join fetch perm.roles where perm.id =:id")
    Optional<Perm> findOneWithEagerRelationships(@Param("id") Long id);

}
