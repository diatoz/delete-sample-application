package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Perm;
import io.github.jhipster.application.service.PermService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Perm.
 */
@RestController
@RequestMapping("/api")
public class PermResource {

    private final Logger log = LoggerFactory.getLogger(PermResource.class);

    private static final String ENTITY_NAME = "perm";

    private final PermService permService;

    public PermResource(PermService permService) {
        this.permService = permService;
    }

    /**
     * POST  /perms : Create a new perm.
     *
     * @param perm the perm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perm, or with status 400 (Bad Request) if the perm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/perms")
    @Timed
    public ResponseEntity<Perm> createPerm(@RequestBody Perm perm) throws URISyntaxException {
        log.debug("REST request to save Perm : {}", perm);
        if (perm.getId() != null) {
            throw new BadRequestAlertException("A new perm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Perm result = permService.save(perm);
        return ResponseEntity.created(new URI("/api/perms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /perms : Updates an existing perm.
     *
     * @param perm the perm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perm,
     * or with status 400 (Bad Request) if the perm is not valid,
     * or with status 500 (Internal Server Error) if the perm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/perms")
    @Timed
    public ResponseEntity<Perm> updatePerm(@RequestBody Perm perm) throws URISyntaxException {
        log.debug("REST request to update Perm : {}", perm);
        if (perm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Perm result = permService.save(perm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /perms : get all the perms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perms in body
     */
    @GetMapping("/perms")
    @Timed
    public List<Perm> getAllPerms() {
        log.debug("REST request to get all Perms");
        return permService.findAll();
    }

    /**
     * GET  /perms/:id : get the "id" perm.
     *
     * @param id the id of the perm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perm, or with status 404 (Not Found)
     */
    @GetMapping("/perms/{id}")
    @Timed
    public ResponseEntity<Perm> getPerm(@PathVariable Long id) {
        log.debug("REST request to get Perm : {}", id);
        Optional<Perm> perm = permService.findOne(id);
        return ResponseUtil.wrapOrNotFound(perm);
    }

    /**
     * DELETE  /perms/:id : delete the "id" perm.
     *
     * @param id the id of the perm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/perms/{id}")
    @Timed
    public ResponseEntity<Void> deletePerm(@PathVariable Long id) {
        log.debug("REST request to delete Perm : {}", id);
        permService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
