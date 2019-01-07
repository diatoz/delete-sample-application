package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PermService;
import io.github.jhipster.application.domain.Perm;
import io.github.jhipster.application.repository.PermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Perm.
 */
@Service
@Transactional
public class PermServiceImpl implements PermService {

    private final Logger log = LoggerFactory.getLogger(PermServiceImpl.class);

    private final PermRepository permRepository;

    public PermServiceImpl(PermRepository permRepository) {
        this.permRepository = permRepository;
    }

    /**
     * Save a perm.
     *
     * @param perm the entity to save
     * @return the persisted entity
     */
    @Override
    public Perm save(Perm perm) {
        log.debug("Request to save Perm : {}", perm);
        return permRepository.save(perm);
    }

    /**
     * Get all the perms.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Perm> findAll() {
        log.debug("Request to get all Perms");
        return permRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Perm with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Perm> findAllWithEagerRelationships(Pageable pageable) {
        return permRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one perm by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Perm> findOne(Long id) {
        log.debug("Request to get Perm : {}", id);
        return permRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the perm by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Perm : {}", id);
        permRepository.deleteById(id);
    }
}
