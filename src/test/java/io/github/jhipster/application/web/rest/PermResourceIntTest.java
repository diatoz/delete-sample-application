package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.DeleteApp;

import io.github.jhipster.application.domain.Perm;
import io.github.jhipster.application.repository.PermRepository;
import io.github.jhipster.application.service.PermService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PermResource REST controller.
 *
 * @see PermResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeleteApp.class)
public class PermResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PermRepository permRepository;

    @Mock
    private PermRepository permRepositoryMock;

    @Mock
    private PermService permServiceMock;

    @Autowired
    private PermService permService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPermMockMvc;

    private Perm perm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PermResource permResource = new PermResource(permService);
        this.restPermMockMvc = MockMvcBuilders.standaloneSetup(permResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Perm createEntity(EntityManager em) {
        Perm perm = new Perm()
            .name(DEFAULT_NAME);
        return perm;
    }

    @Before
    public void initTest() {
        perm = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerm() throws Exception {
        int databaseSizeBeforeCreate = permRepository.findAll().size();

        // Create the Perm
        restPermMockMvc.perform(post("/api/perms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perm)))
            .andExpect(status().isCreated());

        // Validate the Perm in the database
        List<Perm> permList = permRepository.findAll();
        assertThat(permList).hasSize(databaseSizeBeforeCreate + 1);
        Perm testPerm = permList.get(permList.size() - 1);
        assertThat(testPerm.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPermWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permRepository.findAll().size();

        // Create the Perm with an existing ID
        perm.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermMockMvc.perform(post("/api/perms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perm)))
            .andExpect(status().isBadRequest());

        // Validate the Perm in the database
        List<Perm> permList = permRepository.findAll();
        assertThat(permList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPerms() throws Exception {
        // Initialize the database
        permRepository.saveAndFlush(perm);

        // Get all the permList
        restPermMockMvc.perform(get("/api/perms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perm.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPermsWithEagerRelationshipsIsEnabled() throws Exception {
        PermResource permResource = new PermResource(permServiceMock);
        when(permServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPermMockMvc = MockMvcBuilders.standaloneSetup(permResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPermMockMvc.perform(get("/api/perms?eagerload=true"))
        .andExpect(status().isOk());

        verify(permServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPermsWithEagerRelationshipsIsNotEnabled() throws Exception {
        PermResource permResource = new PermResource(permServiceMock);
            when(permServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPermMockMvc = MockMvcBuilders.standaloneSetup(permResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPermMockMvc.perform(get("/api/perms?eagerload=true"))
        .andExpect(status().isOk());

            verify(permServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPerm() throws Exception {
        // Initialize the database
        permRepository.saveAndFlush(perm);

        // Get the perm
        restPermMockMvc.perform(get("/api/perms/{id}", perm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perm.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPerm() throws Exception {
        // Get the perm
        restPermMockMvc.perform(get("/api/perms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerm() throws Exception {
        // Initialize the database
        permService.save(perm);

        int databaseSizeBeforeUpdate = permRepository.findAll().size();

        // Update the perm
        Perm updatedPerm = permRepository.findById(perm.getId()).get();
        // Disconnect from session so that the updates on updatedPerm are not directly saved in db
        em.detach(updatedPerm);
        updatedPerm
            .name(UPDATED_NAME);

        restPermMockMvc.perform(put("/api/perms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerm)))
            .andExpect(status().isOk());

        // Validate the Perm in the database
        List<Perm> permList = permRepository.findAll();
        assertThat(permList).hasSize(databaseSizeBeforeUpdate);
        Perm testPerm = permList.get(permList.size() - 1);
        assertThat(testPerm.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPerm() throws Exception {
        int databaseSizeBeforeUpdate = permRepository.findAll().size();

        // Create the Perm

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPermMockMvc.perform(put("/api/perms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perm)))
            .andExpect(status().isBadRequest());

        // Validate the Perm in the database
        List<Perm> permList = permRepository.findAll();
        assertThat(permList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerm() throws Exception {
        // Initialize the database
        permService.save(perm);

        int databaseSizeBeforeDelete = permRepository.findAll().size();

        // Get the perm
        restPermMockMvc.perform(delete("/api/perms/{id}", perm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Perm> permList = permRepository.findAll();
        assertThat(permList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Perm.class);
        Perm perm1 = new Perm();
        perm1.setId(1L);
        Perm perm2 = new Perm();
        perm2.setId(perm1.getId());
        assertThat(perm1).isEqualTo(perm2);
        perm2.setId(2L);
        assertThat(perm1).isNotEqualTo(perm2);
        perm1.setId(null);
        assertThat(perm1).isNotEqualTo(perm2);
    }
}
