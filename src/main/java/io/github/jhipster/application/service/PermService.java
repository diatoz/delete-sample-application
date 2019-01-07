package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Perm;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Perm.
 */
public interface PermService {

    /**
     * Save a perm.
     *
     * @param perm the entity to save
     * @return the persisted entity
     */
    Perm save(Perm perm);

    /**
     * Get all the perms.
     *
     * @return the list of entities
     */
    List<Perm> findAll();

    /**
     * Get all the Perm with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Perm> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" perm.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Perm> findOne(Long id);

    /**
     * Delete the "id" perm.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
