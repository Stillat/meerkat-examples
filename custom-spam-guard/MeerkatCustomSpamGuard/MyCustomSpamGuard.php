<?php

namespace Statamic\Addons\MeerkatCustomSpamGuard;

use Statamic\Addons\Meerkat\Contracts\Comments\Spam\SpamDetector;

/**
 * Class MyCustomSpamGuard
 *
 * A boilerplate for integrating a custom Meerkat spam guard.
 *
 * @package Statamic\Addons\MeerkatCustomSpamGuard
 * @since 1.0.0
 */
class MyCustomSpamGuard implements SpamDetector
{

    /**
     * Indicates if the last operation was a success.
     *
     * @var bool
     */
    private $success = true;

    /**
     * Holds the last error message.
     *
     * @var string
     */
    private $lastErrorMessage = '';

    /**
     * Gets the name of this spam detector.
     *
     * The name of the spam guard is used when reporting
     * specific failures to a user in the Control Panel.
     *
     * @return string
     */
    public function getName()
    {
        return 'MyCustomSpamGuard';
    }

    /**
     * Returns a value indicating the last operation was a success.
     *
     * Used to indicate if this spam detector encountered a failure.
     * A useful error message should also be supplied when this
     * has occurred, as it will be displayed to CP users.
     *
     * @return bool
     */
    public function wasSuccess()
    {
        return $this->success;
    }

    /**
     * Gets the last error message, if any.
     *
     * This will be displayed to Control Panel users
     * if the wasSuccess() method returns false.
     *
     * @return string
     */
    public function getErrorMessage()
    {
        return $this->lastErrorMessage;
    }

    /**
     * Tests the provided data for spaminess.
     *
     * @param array $data The comment data being tested.
     * @return bool
     */
    public function isSpam($data)
    {
        // Implement this method to test if the provided data
        // should be considered spam or not. If the data
        // is considered to be spam return `true`. In
        // all other situations just return `false`.

        // $data will be array containing all the data
        // that is stored for the individual comment.
        // You will also have access to the comment
        // context at this point.

        // This is where the API code would go to
        // call a third-party API, for example.
        $isSpam = false;

        return $isSpam;
    }


    /**
     * Submits the provided data to a third-party service as "spam".
     *
     * @param array $data Submits the specimen to a remote service.
     * @return mixed|void
     */
    public function submitSpam($data)
    {
        // If your integration does not do this, simply return.
        return;
    }

    /**
     * Submits the provided data to a third-party service as "not spam".
     *
     * @param array $data Submits the specimen to a remote service.
     * @return mixed|void
     */
    public function submitHam($data)
    {
        // If your integration does not do this, simply return.
        return;
    }
}