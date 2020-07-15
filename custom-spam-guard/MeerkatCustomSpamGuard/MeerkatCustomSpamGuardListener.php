<?php

namespace Statamic\Addons\MeerkatCustomSpamGuard;

use Statamic\Addons\Meerkat\Comments\Spam\Guard;
use Statamic\Extend\Listener;

/**
 * Class MeerkatCustomSpamGuardListener
 *
 * Listens for the Meerkat.guard.starting event
 * and adds a custom spam guard integration.
 *
 * @package Statamic\Addons\MeerkatCustomSpamGuard
 * @since 1.0.0
 */
class MeerkatCustomSpamGuardListener extends Listener
{
    /**
     * The events to be listened for, and the methods to call.
     *
     * @var array
     */
    public $events = [
        'Meerkat.guard.starting' => 'loadGuard',
    ];

    /**
     * Invoked when Meerkat is starting its spam guard service.
     *
     * @param Guard $guard The shared Guard instance.
     */
    public function loadGuard(Guard $guard)
    {
        // Let Meerkat know to add our custom Spam Guard to the list.
        $guard->registerDetector(new MyCustomSpamGuard());
    }
}
